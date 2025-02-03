// src/app/core/services/config.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfigService {
    get production(): boolean {
        return environment.production;
    }
}