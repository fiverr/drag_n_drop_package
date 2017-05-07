import { storiesOf } from '@kadira/storybook';
import DragDropWrapper from './DragDropWrapper';

storiesOf('Welcome', module)
  .add('initial', () => (
      <DragDropWrapper/>
  ));