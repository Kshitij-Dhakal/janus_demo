import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JanusResponse } from '../model/janus-response';
import { JanusRequest } from '../model/janus-request';

@Injectable({
  providedIn: 'root'
})
export class JanusService {

  constructor(private http: HttpClient) { }

  createSession(): Observable<JanusResponse> {
    const createSessionRequest: JanusRequest = {
      janus: 'create'
    }
    return this.http.post<JanusResponse>(`${environment.janusBaseUrl}/janus`, createSessionRequest)
  }

  getPluginId(): Observable<JanusResponse> {
    const createSessionRequest: JanusRequest = {
      janus: "create",
      plugin: "janus.plugin.videoroom"
    }
    return this.http.post<JanusResponse>(`${environment.janusBaseUrl}/janus`, createSessionRequest)
  }
}
