import { Injectable } from '@nestjs/common';
import { Page } from './page.interface';

@Injectable()
export class PageService {
  private pages: Page[] = [];

  add(page: Page) {
    this.pages.push(page);
  }

  delete(name: string) {
    const pageToDelete = this.pages.find(pg => pg.name === name);
    if (!pageToDelete) return false;
    const newpages = this.pages.filter(pg => pg.name === name);
    this.pages = [...newpages];
    return true;
  }

  update(page: Page) {
    const pageToUpdate = this.pages.find(pg => pg.name === page.name);
    if (!pageToUpdate) return false;
    const newpages = this.pages.filter(pg => pg.name !== pageToUpdate.name);
    this.pages = [...newpages, page ];
    return true;
  }

  get() {
    return this.pages;
  }
}
