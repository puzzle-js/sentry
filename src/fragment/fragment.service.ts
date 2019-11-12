import { Injectable } from '@nestjs/common';
import { Fragment } from './fragment.interface';

@Injectable()
export class FragmentService {
  private fragments: Fragment[] = [];

  add(fragment: Fragment) {
    this.fragments.push(fragment);
  }

  update(fragment: Fragment) {
    const fragmentToUpdate = this.fragments.find(gw => gw.name === fragment.name);
    if (!fragmentToUpdate) return false;
    const newfragments = this.fragments.filter(gw => gw.name === fragmentToUpdate.name);
    this.fragments = [...newfragments, { ...fragmentToUpdate, ...fragment }];
  }

  get() {
    return this.fragments;
  }
}
