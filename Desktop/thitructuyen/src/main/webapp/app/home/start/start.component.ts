import {Component} from '@angular/core';
import {CauhoiComponent} from "app/entities/cauhoi/cauhoi.component";
import {filter, map} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ICauhoi} from "app/shared/model/cauhoi.model";
import {IKetqua, Ketqua} from "app/shared/model/ketqua.model";
import {IUser} from "app/core/user/user.model";
import {JhiAlertService} from "ng-jhipster";
import {KetquaService} from "app/entities/ketqua/ketqua.service";
import {UserService} from "app/core/user/user.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";


@Component({
  selector: 'jhi-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent extends CauhoiComponent {
  users: IUser[];

  editForm = this.fb.group({
    id: [],
    diemso: [],
    user: []
  });
  loadAll() {
    this.cauhoiService
      .queryRandom()
      .pipe(
        filter((res: HttpResponse<ICauhoi[]>) => res.ok),
        map((res: HttpResponse<ICauhoi[]>) => res.body)
      )
      .subscribe(
        (res: ICauhoi[]) => {
          this.cauhois = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }
  checkTest() {
    let scopeTest = 0;
    for (let i = 0; i < 5; i++) {
      if (this.cauhois[i].cauTraLoi === this.cauhois[i].ketqua) {
        scopeTest = scopeTest + 20;
      }
    }
    alert("Bạn đạt "+scopeTest + " điểm");
  }
}
