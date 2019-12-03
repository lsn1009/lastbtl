import { IDokho } from 'app/shared/model/dokho.model';
import { ILoai } from 'app/shared/model/loai.model';

export interface ICauhoi {
  cauTraLoi?: string;
  id?: number;
  noidung?: string;
  ketqua?: string;
  dapan1?: string;
  dapan2?: string;
  dapan3?: string;
  dapan4?: string;
  dokho?: IDokho;
  loai?: ILoai;
}

export class Cauhoi implements ICauhoi {
  constructor(
    public id?: number,
    public noidung?: string,
    public ketqua?: string,
    public dapan1?: string,
    public dapan2?: string,
    public dapan3?: string,
    public dapan4?: string,
    public dokho?: IDokho,
    public loai?: ILoai,
    public cauTraLoi?: string
  ) {}
}
