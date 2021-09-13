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
            'invalidUsername': 'Nur Buchstaben, Zahlen und _ - . sind erlaubt.',
            'email': 'Bitte gib eine gültige Email Adresse an.',
            "MatchPassword": 'Die Passwörter stimmen nicht überein.'
        };

        return config[validatorName];
    }

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
