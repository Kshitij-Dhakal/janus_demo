import { Component, OnInit } from '@angular/core';
import { JanusService } from 'src/app/service/janus.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  constructor(private janusService: JanusService) { }

  ngOnInit(): void {
  }

  public createRoom() {
    this.janusService.
  }
}
