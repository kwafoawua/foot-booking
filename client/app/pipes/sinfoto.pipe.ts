/**
 * Created by pablo on 30/9/2017.
 */

import {Pipe, PipeTransform} from "@angular/core";
@Pipe ({

    name:'sinfoto'
})
export class Sinfotopipe implements PipeTransform{

    transform(club:any, args?: any ): any{

        if(club.profileImg){

            return club.profileImg;
        }
        else { return "noimagen.jpg"}

    }


}