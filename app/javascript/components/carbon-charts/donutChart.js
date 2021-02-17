import React from 'react';
import PropTypes from 'prop-types';
import { DonutChart } from '@carbon/charts-react';

const DonutChartGraph = ({ data }) => {
  const options = {
    donut: {
      center: {
        label: __('Total'),
      },
    },
    height: '400px',
    resizable: true,
  };

  return (
    <DonutChart data={data} options={options} />
  );
};

DonutChartGraph.propTypes = {
  data: PropTypes.array,
};

DonutChartGraph.defaultProps = {
  data: null,
};

export default DonutChartGraph;
