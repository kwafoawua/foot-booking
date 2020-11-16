import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MercadoPagoService {

  constructor(private http: HttpClient) {
  }

  accountIsAlreadyLinked(id: string) {
    return this.http.get('/mercadopago/hasLinkedAccount/' +id );
  }

  linkMPAccount(id: string) {
    return this.http.get('/mercadopago/linkMPAccount/' + id);
  }

}
