import { Injectable } from '@nestjs/common';
import { Fragment } from './fragment.interface';

@Injectable()
export class FragmentService {
  private fragments: Fragment[] = [];

  add(fragment: Fragment) {
    this.fragments.push(fragment);
  }

  delete(name: string) {
    const fragmentToDelete = this.fragments.find(fr => fr.name === name);
    if (!fragmentToDelete) return false;
    const newfragments = this.fragments.filter(fr => fr.name === name);
    this.fragments = [...newfragments];
    return true;
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
