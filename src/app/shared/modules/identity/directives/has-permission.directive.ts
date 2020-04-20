import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { IdentityService } from '../identity.service';
import { UserModel } from '../models/user.model';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {

  private _permissions = [];
  private _isHidden = true;
  private _logicalOp = 'AND';
  private _accessLevel = 1;

  constructor(private _element: ElementRef,
              private _templateRef: TemplateRef<any>,
              private _viewContainer: ViewContainerRef,
              private _identityService: IdentityService) { }

  ngOnInit(): void {
    this._updateView();
  }

  @Input()
  set hasPermission(permissions: string | string[]) {
    this._permissions = [].concat(permissions);
    this._updateView();
  }

  @Input()
  set hasPermissionOp(operation: string) {
    this._logicalOp = operation;
    this._updateView();
  }

  @Input()
  set hasPermissionAl(accessLevel: number) {
    this._accessLevel = accessLevel;
  }

  private _updateView() {
    if (this._identityService.user) {
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
