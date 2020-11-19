import { Component, Input } from '@angular/core';
import { faTwitter, faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-url',
  template: `
    <ng-container *ngIf="url; else invalid">
      <a class="btn-sm btn btn-default" href="{{url}}" target="_blank">
        <fa-icon [icon]="icon"></fa-icon>
      </a>
    </ng-container>
    <ng-template #invalid>
    </ng-template>
  `
})
export class UrlComponent {

  @Input()
  public url: string;

  private defaultIcon = faGlobe;

  private iconMap = {
    'facebook.com': faFacebook,
    'instagram.com': faInstagram,
    'linkedin.com': faLinkedin,
    'twitter.com': faTwitter,
  };

  get icon(): IconDefinition | string[] | string {
    for (const key in this.iconMap) {
      if (this.url.includes(key)) {
        return this.iconMap[key];
      }
    }
    return this.defaultIcon;
  }

}
