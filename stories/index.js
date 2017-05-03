import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import DragDropWrapper from './DragDropWrapper';

const dragList = [1,2,3,4];

const styles = {
    item: {
        border: '1px solid black',
        margin: '20px',
        padding: '10px'
    }
};

storiesOf('Welcome', module)
  .add('initial', () => (
      <DragDropWrapper/>
  ));