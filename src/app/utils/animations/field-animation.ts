import { animate, sequence, state, style, transition, trigger } from '@angular/animations';
import { FieldColor } from '../constants/field-color';

export const normal = trigger('normal', [
    state('empty', style({
      backgroundColor: FieldColor.EMPTY
    })),
    state('wall', style({
      backgroundColor: FieldColor.WALL
    })),
    state('start', style({
      backgroundColor: FieldColor.START
    })),
    state('end', style({
      backgroundColor: FieldColor.END
    })),
    state('open', style({
      backgroundColor: FieldColor.OPEN
    })),
    state('closed', style({
      backgroundColor: FieldColor.CLOSED
    })),
    state('path', style({
      backgroundColor: FieldColor.PATH
    })),
    transition('* => empty', [
      sequence([
        style({
          borderRadius: "50%"
        }),
        animate('0s', style({
          borderRadius: "0%"
        }))
      ])
    ]),
    transition('* => wall', [
      sequence([
        style({
          backgroundColor: FieldColor.WALL,
          transform: "scale(.3)",
          borderRadius: "100%"
        }),
        animate('0.2s', style({
          transform: "scale(1)",
          borderRadius: "0%"
        }))
      ])
    ]),
    transition('* => start', [
      sequence([
        style({
          backgroundColor: FieldColor.START,
          transform: "scale(.3)",
          borderRadius: "100%"
        }),
        animate('0.2s', style({
          transform: "scale(1)",
          borderRadius: "0%"
        }))
      ])
    ]),
    transition('* => end', [
      sequence([
        style({
          backgroundColor: FieldColor.END,
          transform: "scale(.3)",
          borderRadius: "100%"
        }),
        animate('0.2s', style({
          transform: "scale(1)",
          borderRadius: "0%"
        }))
      ])
    ]),
    transition('* => open', [
      sequence([
        style({
          backgroundColor: FieldColor.OPEN,
          transform: "scale(.3)",
          borderRadius: "100%"
        }),
        animate('0.2s', style({
          transform: "scale(1)",
          borderRadius: "0%"
        }))
      ])
    ]),
    transition('open => closed', [
      sequence([
        style({
          backgroundColor: FieldColor.OPEN,
        }),
        animate('0.5s', style({
          backgroundColor: FieldColor.CLOSED,
        }))
      ])
    ]),
    transition('* => path', [
      sequence([
        style({
          backgroundColor: FieldColor.PATH,
          transform: "scale(.3)",
          borderRadius: "100%"
        }),
        animate('0.2s', style({
          transform: "scale(1)",
          borderRadius: "0%"
        }))
      ])
    ]),
  ])