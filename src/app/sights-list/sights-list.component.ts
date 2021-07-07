import {Component, OnInit} from '@angular/core';
import {SightsService} from '../services/sights.service';
import {SightseeingPoint} from '../models/sightseeing-point';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SightDetailsComponent} from '../modules/sight-details/components/sight-details/sight-details.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sights-list',
  templateUrl: './sights-list.component.html',
  styleUrls: ['./sights-list.component.scss']
})
export class SightsListComponent implements OnInit {

  sights: SightseeingPoint[];

  constructor(private sightsService: SightsService, private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit(): void {
    this.sightsService.getSights().subscribe(sights => {
      this.sights = sights;
    });
  }

  open(currentSight: SightseeingPoint): void {
    const modalRef = this.modalService.open(SightDetailsComponent, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.currentSight = currentSight;
  }

  editObject(index: number): void {
    this.router.navigateByUrl(`/edit/${index}`);
  }
}
