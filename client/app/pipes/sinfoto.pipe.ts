/**
 * Created by pablo on 30/9/2017.
 */

import {Pipe, PipeTransform} from "@angular/core";
@Pipe ({

    name:'sinfoto'
})
export class Sinfotopipe implements PipeTransform{

    transform(value:any, args?: any ): any{

        let noimagen = "/noimagen.jpg";


        if(!value){
            return noimagen ;


        }
        return (value.lenght > 0 ) ? value[1].url : noimagen;

    }


}