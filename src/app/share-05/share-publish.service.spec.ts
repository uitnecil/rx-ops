import { inject, TestBed } from '@angular/core/testing';

import { SharePublishService } from './share-publish.service';

describe('SharePublishService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharePublishService]
    });
  });

  it('should be created', inject([SharePublishService], (service: SharePublishService) => {
    expect(service).toBeTruthy();
  }));
});
