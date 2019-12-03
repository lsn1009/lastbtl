import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IKetqua, Ketqua } from 'app/shared/model/ketqua.model';
import { KetquaService } from './ketqua.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-ketqua-update',
  templateUrl: './ketqua-update.component.html'
})
export class KetquaUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    diemso: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ketquaService: KetquaService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ketqua }) => {
      this.updateForm(ketqua);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(ketqua: IKetqua) {
    this.editForm.patchValue({
      id: ketqua.id,
      diemso: ketqua.diemso,
      user: ketqua.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ketqua = this.createFromForm();
    if (ketqua.id !== undefined) {
      this.subscribeToSaveResponse(this.ketquaService.update(ketqua));
    } else {
      this.subscribeToSaveResponse(this.ketquaService.create(ketqua));
    }
  }

  public createFromForm(): IKetqua {
    return {
      ...new Ketqua(),
      id: this.editForm.get(['id']).value,
      diemso: this.editForm.get(['diemso']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKetqua>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
