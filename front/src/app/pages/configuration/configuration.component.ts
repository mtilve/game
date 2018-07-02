import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BackService } from '../../services/services';
import { Move } from  '../../clases/interfaces';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import 'style-loader!./configuration.scss';

@Component({
  selector: 'configuration',
  templateUrl: './configuration.html',
  providers: [BackService, ToasterService]
})

  export class ConfigurationComponent implements OnInit {
 
    status: any = '';
	  error: string = '';
    isLoading: boolean = true;
    moves:  Array<Move> = [];

    settings = {
      mode: 'inline',
      pager : {
          display: true,
          perPage: 5
      },add: {
        addButtonContent: '<i class="fa fa-plus" title=""></i>',
        createButtonContent: '<i class="fa fa-check" title=""></i>',
        cancelButtonContent: '<i class="fa fa-close" title=""></i>',
        confirmCreate:true
      },
      
      edit: {
        editButtonContent: '<i class="fa fa-pencil" title=""></i>',
        saveButtonContent: '<i class="fa fa-floppy-o" title=""></i>',
        cancelButtonContent: '<i class="fa fa-close" title=""></i>',
        confirmSave: true
      },
      
      delete: {
        deleteButtonContent: '<i class="fa fa-trash-o"></i>',
        confirmDelete: true,
      },
      columns: {
        move: {
          title: 'Move'
        },
        kills: {
          title: 'Kills'
        }
      }
    };

    config: ToasterConfig;
    position = 'toast-top-center';
    animationType = 'fade';
    timeout = 5000;
    toastsLimit = 5;

    
    constructor(private router: Router,
                private backService: BackService,
                private toasterService: ToasterService) { }
 
    ngOnInit() 
    {   
        this.backService.GetMoves().subscribe((data:  Array<Move>) => {
          this.moves  =  data;
      }, e => this.error = e, () => this.isLoading = false);
    }

    return()
    {
        this.router.navigate(['home']);
    }

    createConfirm(event) {

      if (event.newData.move !== '' && event.newData.kills !== ''){

        if (event.newData.move !== event.newData.kills){

          this.backService.AddMove(event.newData.move, event.newData.kills).subscribe(() => {
            this.showToast('success', 'Success', 'Move added!');  
            event.confirm.resolve();
            this.ngOnInit();
          }, e => this.error = e, () => this.isLoading = false);
      }else
      {
        this.showToast('info', 'Information', 'Move and Kills Can\'t be the same!');
        event.confirm.reject();
      }
      }else
      {
        this.showToast('info', 'Information', 'Can\'t add an empty move!');
        event.confirm.reject();
      }
    }



  editConfirm(event)
  {
      var data = {
      "_id" : event.newData._id,
      "move" : event.newData.move,
      "kills" : event.newData.kills
      };
    if (data.move !== '' && data.kills !== ''){

      if (event.newData.move !== event.newData.kills){
        this.backService.UpdateMove(data).subscribe(() => {
          this.showToast('success', 'Success', 'Move edited!');  
          event.confirm.resolve();
        }, e => this.error = e, () => this.isLoading = false);
    }else
    {
      this.showToast('info', 'Information', 'Move and Kills Can\'t be the same!');
      event.confirm.reject();
    }
    }else
    {
      this.showToast('info', 'Information', 'Can\'t edit an empty move!');
      event.confirm.reject();
    }
  }

    deleteConfirm(event)
    {
        var data = {"_id" : event.data._id,
        "move" : event.data.move,
        "kills" : event.data.kills
        };

        this.backService.RemoveMove(event.data._id).subscribe(() => {
          this.showToast('success', 'Success', 'Move deleted!');      
          event.confirm.resolve();
        }, e => this.error = e, () => this.isLoading = false);
    }

    private showToast(type: string, title: string, body: string) {
      this.config = new ToasterConfig({
        positionClass: this.position,
        timeout: this.timeout,
        newestOnTop: true,
        tapToDismiss: true,
        preventDuplicates: false,
        animation: this.animationType,
        limit: this.toastsLimit,
      });
      const toast: Toast = {
        type: type,
        title: title,
        body: body,
        timeout: this.timeout,
        showCloseButton: true,
        bodyOutputType: BodyOutputType.TrustedHtml,
      };
      this.toasterService.popAsync(toast);
    }
}

