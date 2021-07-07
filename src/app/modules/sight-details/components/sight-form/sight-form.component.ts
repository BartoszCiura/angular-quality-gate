import {Component, OnInit} from '@angular/core';
import {SightDetailService} from '../../services/sight-detail.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SightseeingPoint} from '../../../../models/sightseeing-point';
import {Country} from '../../../../models/country';

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
  countries = [
    {name: 'Poland', iataCode: 'PL'},
    {name: 'England', iataCode: 'EN'},
    {name: 'Nederland', iataCode: 'NL'}];

  constructor(private sightDetails: SightDetailService, private router: Router,
              private route: ActivatedRoute) {
    this.addAndEdit = new FormGroup({
      latitude: new FormControl('', [Validators.required, Validators.pattern(this.DDLatRegex)]),
      longitude: new FormControl('', [Validators.required, Validators.pattern(this.DDLngRegex)]),
      name: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      color: new FormControl('', [Validators.required, Validators.min(1), Validators.max(3)]),
      country: new FormControl('', Validators.required)
    });
    this.route.params.subscribe(params => this.id = params.id);
  }

  showError(controlName: string, errorName: string): boolean {
    return this.addAndEdit.get(controlName)?.touched && this.addAndEdit.get(controlName)?.errors?.[errorName];
  }

  ngOnInit(): void {
    if (this.id) {
      this.sightDetails.getSightseeingPoint(this.id).subscribe((data) => {
        this.sightObject = new SightseeingPoint(
          data.name,
          data.longitude,
          data.latitude,
          new Country(
            data.country.name,
            data.country.iataCode
          ),
          data.description,
          data.color,
          data.id
        );
        this.addAndEdit.patchValue(this.sightObject);
      });
    }
  }

  saveOrEdit(): void {
    if (this.sightObject) {
      console.log('tu');
      this.sightDetails.editSightseeingPoint(this.id, this.addAndEdit.value)
        .subscribe(() => {
          this.router.navigateByUrl(`/`);
          alert('Object Edited!');
        });
      return;
    }
    const country = this.countries.find((c: Country) => c.name === this.addAndEdit.value.country);
    this.sightObject = new SightseeingPoint(
      this.addAndEdit.value.name,
      this.addAndEdit.value.longitude,
      this.addAndEdit.value.latitude,
      country,
      this.addAndEdit.value.description,
      this.addAndEdit.value.color,
      this.addAndEdit.value.id
    );
    this.sightDetails.addSightseeingPointToJSON(this.sightObject).subscribe(() => {
      alert('Object Added!');
    });
  }

}
