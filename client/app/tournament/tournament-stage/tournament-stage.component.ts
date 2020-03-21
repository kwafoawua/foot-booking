import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

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

}
