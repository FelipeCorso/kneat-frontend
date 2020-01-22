import {Component, OnInit} from '@angular/core';
import {StarWarsService} from '../services/star-wars.service';
import {ResourceType} from '../enum/resource-type.enum';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  constructor(
    private starWarsService: StarWarsService
  ) {
  }

  ngOnInit() {
// whenRouteChange
    let observable;
    let resourceType;
    let entityId;
    switch (resourceType) {
      case ResourceType.STARSHIPS:
        observable = this.starWarsService.getStarshipById;
        break;
    }

    observable(entityId)
      .subscribe();
  }
}
