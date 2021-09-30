import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'osem-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  script = `
    <html>
      <script type="text/javascript">
          /* Configure at https://www.betterplace.org/de/manage/projects/89947-opensensemap-org-die-freie-karte-fuer-umweltdaten/iframe_donation_form/new */
          (function() {
              var bp = document.createElement('script');
              bp.type = 'text/javascript';
              bp.async = true;
              bp.src = 'https://betterplace-assets.betterplace.org/assets/load_donation_iframe.js';
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(bp, s);
          })();
      </script>
      <body>
        <div id="betterplace_donation_iframe" style="background: transparent url('https://www.betterplace.org/assets/new_spinner.gif') 275px 20px no-repeat;"><strong><a href="https://www.betterplace.org/de/donate/platform/projects/89947-opensensemap-org-die-freie-karte-fuer-umweltdaten">Jetzt Spenden für „openSenseMap.org - Die freie Karte für Umweltdaten“ bei unserem Partner betterplace.org</a></strong></div>
      </body
    </html>
  `;

  @ViewChild('content') div: ElementRef;

  constructor(private sanitizer: DomSanitizer, private translate: TranslateService) {
    // Init Betterplace global variables
    window["_bp_iframe"] = {
      project_id: 89947, /* REQUIRED */
      lang: this.translate.currentLang.split('-')[0], /* Language of the form */
      width: 600, /* Custom iframe-tag-width, integer */
      color: '357f68', /* Button and banderole color, hex without "#" */
      background_color: 'fff', /* Background-color, hex without "#" */
      default_amount: 50, /* Donation-amount, integer 1-99 */
      recurring_interval: 'single', /* Interval for recurring donations, string out of single, monthly und yearly */
      bottom_logo: false,
    };
    this.script = this.sanitizer.bypassSecurityTrustHtml(this.script) as string;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const scripts = this.div.nativeElement.getElementsByTagName('script');

    // Execute script to generate Donate form
    setTimeout(() => {
      eval(scripts[0].text);
    }, 1000);
  }

}
