import { trigger, state, animate, transition, style, query } from '@angular/animations';

export const slideInOutAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('slideInOutAnimation', [

        // route 'enter' transition
        transition(':enter', [

            // styles at start of transition
            style({
                // start with the content positioned off the right of the screen, 
                // -400% is required instead of -100% because the negative position adds to the width of the element
                // bottom: '-400%',
                opacity: 0,
                height: 0,
                // start with background opacity set to 0 (invisible)
            }),
            
            // animation and styles at end of transition
            animate('0.5s ease-in-out', style({
                // transition the right position to 0 which slides the content into view
                opacity: 1,
                height: '*',

                // transition the background opacity to 0.8 to fade it in
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }))
        ]),

        // route 'leave' transition
        transition(':leave', [
            // animation and styles at end of transition
            animate('.5s ease-in-out', style({
                // transition the right position to -400% which slides the content out of view
                // bottom: '-400%',
                opacity: 0,
                height: 0,

                // transition the background opacity to 0 to fade it out
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }))
        ])
    ]);

export const slideInOutMenu = 
    trigger('slideInOutMenu', [
        transition(':enter',[ 
            style({transform: 'translate3d(0, -100%, 0)', opacity: 0}),
            animate('400ms ease-in-out'), style({
                transform: 'translate3d(0, 0, 0)',
                opacity: 1
            })
        ]),
        transition(':leave',[
            animate('400ms ease-in-out'), style({
                transform: 'translate3d(0, -100%, 0)',
                opacity: 0,
            })
        ])
    ]);

export const slideInOutHorizontal = 
    trigger('slideInOutHorizontal', [
        transition(':enter',[ 
            style({transform: 'translate3d(-400px, 0, 0)'}),
            animate('400ms ease-in-out'), style({
                transform: 'translate3d(0, 0, 0)'
            })
        ]),
        transition(':leave',[
            animate('400ms ease-in-out'), style({
                transform: 'translate3d(-400px, 0, 0)'
            })
        ])
    ]);

export const shrinkVertical = 
    trigger('shrinkVertical', [
        state('1', style({height: '*'})),
        state('0', style({height: 0})),
        transition('1 => 0', animate('200ms')),
        transition('0 => 1', animate('200ms'))
    ])

export const appearModal = 
    trigger('appearModal', [
        state('1', style({opacity: 1, transform: 'translateY(0%)'})),
        state('0', style({opacity: 0, transform: 'translateY(-10%)'})),
        transition('1 => 0', animate('200ms')),
        transition('0 => 1', animate('200ms'))
    ])


export const slideInOutHorizontalBoolean = 
    trigger('slideInOutHorizontalBoolean', [
        state('1', style({transform: 'translate3d(0, 0, 0)'})),
        state('0', style({transform: 'translate3d(-400px, 0, 0)'})),
        transition('1 => 0', animate('400ms ease-in-out')),
        transition('0 => 1', animate('400ms ease-in-out'))
    ]);

export const growVertHorz = 
    trigger('growVertHorz', [
        state('1', style({height: '*', width: '*'})),
        state('0', style({height: "0px", width: "0px"})),
        transition('1 => 0', animate('200ms ease-in-out')),
        transition('0 => 1', animate('200ms ease-in-out'))
    ]);


// export const appear = 
// trigger('appear', [
//     state('1', style({opacity: '1'})),
//     state('0', style({opacity: "0"})),
//     transition(':leave', animate('200ms ease-in-out')),
//     transition(':enter', animate('200ms ease-in-out'))
// ]);

export const appear = 
    trigger('appear', [
        transition(':enter',[ 
            style({opacity: 0}),
            animate('60ms ease-in-out'), style({
                opacity: 1
            })
        ]),
        transition(':leave',[
            animate('60ms ease-in-out'), style({
                opacity: 0
            })
        ])
    ]);
export const appearSlow = 
    trigger('appearSlow', [
        transition(':enter',[ 
            style({opacity: 0}),
            animate('220ms 400ms ease-in-out'), style({
                opacity: 1
            })
        ]),
        transition(':leave',[
            animate('60ms ease-in-out'), style({
                opacity: 0
            })
        ])
    ]);

export const appearPopup = 
    trigger('appearPopup', [
        transition(':enter',[ 
            style({opacity: 0}),
            animate('200ms ease-in-out'), style({
                opacity: 1
            })
        ]),
        transition(':leave',[
            animate('100ms ease-in-out'), style({
                opacity: 0
            })
        ])
    ]);


export const routingFadeIn = trigger('routingFadeIn', [
    // The '* => *' will trigger the animation to change between any two states
    transition('* => *', [
        // The query function has three params.
        // First is the event, so this will apply on entering or when the element is added to the DOM.
        // Second is a list of styles or animations to apply.
        // Third we add a config object with optional set to true, this is to signal
        // angular that the animation may not apply as it may or may not be in the DOM.
        query(':enter', [style({ opacity: 0, transform: 'translateY(-50%)' })], { optional: true }),
        query(
            ':leave',
            // here we apply a style and use the animate function to apply the style over 0.3 seconds
            [style({ opacity: 1 }), animate('1s ease-out', style({ opacity: 0, transform: 'translateY(-50%)' }))],
            { optional: true }
        ),
        query(
            ':enter',
            [style({ opacity: 0 }), animate('1s ease-out', style({ opacity: 1, transform: 'translateY(0%)' }))],
            { optional: true }
        )
    ])
    ]);