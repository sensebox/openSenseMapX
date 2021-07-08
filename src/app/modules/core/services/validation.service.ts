import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Erforderlich',
            'invalidEmailAddress': 'Keine gültige E-Mail',
            'invalidPassword': 'Min. 6 Zeichen. Min 1 Zahl.',
            'minlength': `Mindestens ${validatorValue.requiredLength} Zeichen`,
            'maxlength': `Höchstens ${validatorValue.requiredLength} Zeichen`,
            'invalidUsername': 'Nur Buchstaben, Zahlen und _ - . sind erlaubt.'
        };

        return config[validatorName];
    }

    // static creditCardValidator(control) {
    //     // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    //     if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
    //         return null;
    //     } else {
    //         return { 'invalidCreditCard': true };
    //     }
    // }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static passwordValidator(control) {
        if (control.value.match(/^(?=.*\d)(?=.*[a-z])(?!.*\s).{6,}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    static userNameValidator(control) {
        if (control.value.match(/^[^~`!@#$%^&*()+=£€{}[\]|\\:;"'<>,?/\n\r\t\s][^~`!@#$%^&*()+=£€{}[\]|\\:;"'<>,?/\n\r\t]{1,39}[^~`!@#$%^&*()+=£€{}[\]|\\:;"'<>,?/\n\r\t\s]$/)) {
            return null;
        } else {
            return { 'invalidUsername': true };
        }
    }

    static MatchPassword(control: AbstractControl) {
        try {
            let password = control.get('password').value; // to get value in input tag
            let confirmPassword = control.get('confirmPassword').value; // to get value in input tag
            if(password != confirmPassword) {
                control.get('confirmPassword').setErrors( {MatchPassword: true} )
            } else {
                return null
            }
        } catch(err) {
            control.get('confirmPassword').setErrors( {MatchPassword: true} )
            return;
        }
    }

    
}
