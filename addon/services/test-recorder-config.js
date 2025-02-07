import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TestRecorderConfigService extends Service {
  @tracked config = {
    selectorStrategy: 'data-test'
  };

  configure(newConfig = {}) {
    this.config = {
      ...this.config,
      ...newConfig
    };
  }
}
