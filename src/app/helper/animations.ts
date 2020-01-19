import { trigger, state, animate, transition, style } from '@angular/animations';

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
            style({transform: 'translate3d(0, -100%, 0)'}),
            animate('400ms ease-in-out'), style({
                transform: 'translate3d(0, 0, 0)'
            })
        ]),
        transition(':leave',[
            animate('400ms ease-in-out'), style({
                transform: 'translate3d(0, -100%, 0)'
            })
        ])
    ]);

export const slideInOutHorizontal = 
    trigger('slideInOutHorizontal', [
        transition(':enter',[ 
            style({transform: 'translate3d(-100%, 0, 0)'}),
            animate('400ms ease-in-out'), style({
                transform: 'translate3d(0, 0, 0)'
            })
        ]),
        transition(':leave',[
            animate('400ms ease-in-out'), style({
                transform: 'translate3d(-100%, 0, 0)'
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


export const slideInOutHorizontalBoolean = 
    trigger('slideInOutHorizontalBoolean', [
        state('1', style({transform: 'translate3d(0, 0, 0)'})),
        state('0', style({transform: 'translate3d(calc(100% *-1), 0, 0)'})),
        transition('1 => 0', animate('400ms ease-in-out')),
        transition('0 => 1', animate('400ms ease-in-out'))
    ]);

export const legendAnimation = 
    trigger('legendAnimation', [
        state('1', style({height: '*', width: '*'})),
        state('0', style({height: "0px", width: "0px"})),
        transition('1 => 0', animate('200ms ease-in-out')),
        transition('0 => 1', animate('200ms ease-in-out'))
    ]);