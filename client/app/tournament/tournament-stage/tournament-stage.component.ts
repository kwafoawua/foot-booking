import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
/**
 * Created by pablo on 25/11/2017.
 */

@Component({
    moduleId: module.id,
    templateUrl: 'tournament-stage.component.html',

})


export class TournamentStageComponent implements OnInit{

    constructor(
        private router: Router,
        private route:ActivatedRoute,){
    }

ngOnInit(){}


    public  goToNewStage(){
        this.router.navigate(['ronda'], {relativeTo: this.route});
    }

    // public goToStage()() {
    //     this.router.navigate(['./ronda'], {relativeTo: this.route});
    // }

}