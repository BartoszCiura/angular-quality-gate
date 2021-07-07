import {Component, OnInit} from '@angular/core';
import {SightDetailService} from '../../services/sight-detail.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SightseeingPoint} from '../../../../models/sightseeing-point';

@Component({
  selector: 'app-sight-form',
  templateUrl: './sight-form.component.html',
  styleUrls: ['./sight-form.component.scss']
})
export class SightFormComponent implements OnInit {

  addAndEdit: FormGroup;
  sightObject: SightseeingPoint;
  id = '';
  DDLatRegex = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
  DDLngRegex = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;

  constructor(private sightDetails: SightDetailService, private router: Router,
              private route: ActivatedRoute) {
    this.addAndEdit = new FormGroup({
      lat: new FormControl('', [Validators.required, Validators.pattern(this.DDLatRegex)]),
      lng: new FormControl('', [Validators.required, Validators.pattern(this.DDLngRegex)]),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required)
    });
    this.route.params.subscribe(params => this.id = params.id);
  }

  showError(controlName: string, errorName: string): boolean {
    return this.addAndEdit.get(controlName)?.touched && this.addAndEdit.get(controlName)?.errors?.[errorName];
  }

  ngOnInit(): void {
    if (this.id) {
      this.sightDetails.getObject(this.id).subscribe((data) => {
        this.sightObject = {
          getColor(): string {
            return '';
          },
          color: data.color,
          latitude: data.latitude,
          longitude: data.longitude,
          name: data.name,
          description: data.description,
          country: data.country
        };
        this.addAndEdit.patchValue(this.sightObject);
      });
    }
  }

  saveOrEdit(): void {
    if (this.sightObject) {
      this.sightDetails.editObject(this.id, this.addAndEdit.value)
        .subscribe(() => {
          this.router.navigateByUrl(`/`);
          alert('Object Edited!');
        });
      return;
    }
    this.sightDetails.addObject(this.addAndEdit.value).subscribe(() => {
      // this.submitted = true;
      alert('Object Added!');
    });
  }

}
