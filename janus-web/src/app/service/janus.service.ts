import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JanusResponse } from '../model/janus-response';
import { JanusRequest } from '../model/janus-request';
import { RandomService } from './random.service';

@Injectable({
  providedIn: 'root'
})
export class JanusService {

  constructor(private http: HttpClient, private randomService: RandomService) { }

  createSession(): Observable<JanusResponse> {
    const createSessionRequest: JanusRequest = {
      transaction: this.randomService.randomPassword(),
      janus: 'create'
    }
    return this.http.post<JanusResponse>(`${environment.janusBaseUrl}/janus`, createSessionRequest)
  }

  getPluginId(): Observable<JanusResponse> {
    return this.createSession()
      .pipe(
        switchMap(janusResponse => {
          const getPluginIdRequest: JanusRequest = {
            transaction: this.randomService.randomPassword(),
            janus: "attach",
            plugin: "janus.plugin.videoroom"
          }
          return this.http.post<JanusResponse>(`${environment.janusBaseUrl}/janus/${janusResponse.data?.id}`, getPluginIdRequest)
        })
      )
  }

  createRoom(): Observable<JanusResponse> {
    return this.getPluginId()
      .pipe(
        switchMap(janusResponse => {
          console.log(janusResponse)
          const createRoomRequest: JanusRequest = {
            transaction: this.randomService.randomPassword(),
            janus: "message",
            plugin: "janus.plugin.videoroom",
            body: {
              request: "create"
            }
          }
          return this.http.post<JanusResponse>(`${environment.janusBaseUrl}/janus/${janusResponse.session_id}/${janusResponse.data?.id}`, createRoomRequest)
        })
      )
  }
}
