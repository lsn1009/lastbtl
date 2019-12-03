import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICauhoi } from 'app/shared/model/cauhoi.model';
import { AccountService } from 'app/core/auth/account.service';
import { CauhoiService } from './cauhoi.service';
import {KetquaService} from "app/entities/ketqua/ketqua.service";
import {IUser} from "app/core/user/user.model";
import {UserService} from "app/core/user/user.service";
import {ILoai} from "app/shared/model/loai.model";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'jhi-cauhoi',
  templateUrl: './cauhoi.component.html'
})
export class CauhoiComponent implements OnInit, OnDestroy {
  cauhois: ICauhoi[];
  user: IUser[];
  currentAccount: any;
  eventSubscriber: Subscription;
  constructor(
    protected cauhoiService: CauhoiService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    protected ketquaService: KetquaService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  loadAll() {
    this.cauhoiService
      .query()
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

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCauhois();
    this.userService
      .queryUser()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.user = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICauhoi) {
    return item.id;
  }

  registerChangeInCauhois() {
    this.eventSubscriber = this.eventManager.subscribe('cauhoiListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
