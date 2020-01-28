import _ from 'lodash';
import { storiesOf } from '@kadira/storybook';
import DragDropWrapper from './DragDropWrapper';

// Mock V2 Global Lodash
window._ = _;

storiesOf('Welcome', module)
  .add('initial', () => (
      <DragDropWrapper/>
  ));
