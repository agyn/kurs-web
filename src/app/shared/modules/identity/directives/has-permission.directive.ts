import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { IdentityService } from '../identity.service';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {

  private _permission: string;
  private _isHidden = true;

  constructor(private _element: ElementRef,
              private _templateRef: TemplateRef<any>,
              private _viewContainer: ViewContainerRef,
              private _identityService: IdentityService) { }

  ngOnInit(): void {
    this._updateView();
  }

  @Input()
  set hasPermission(permission: string) {
    this._permission = permission;
    this._updateView();
  }

  private _updateView() {
    if(this._permission == "notAuthorized"){
      if (!localStorage.getItem('user')) {
        if (this._isHidden) {
          this._viewContainer.createEmbeddedView(this._templateRef);
          this._isHidden = false;
        }
      } else {
        this._isHidden = true;
        this._viewContainer.clear();
      }
    }

    if(this._permission == "Authorized") {
      if (localStorage.getItem('user')) {
        if (this._isHidden) {
          this._viewContainer.createEmbeddedView(this._templateRef);
          this._isHidden = false;
        }
      } else {
        this._isHidden = true;
        this._viewContainer.clear();
      }
    }
  }

}
