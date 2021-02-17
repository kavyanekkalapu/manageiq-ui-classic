import React from 'react';
import PropTypes from 'prop-types';
import { GroupedBarChart } from '@carbon/charts-react';

const GroupBarChart = ({ data }) => {
  const options = {
    axes: {
      left: {
        mapsTo: 'value',
      },
      bottom: {
        scaleType: 'labels',
        mapsTo: 'key',
      },
    },
    height: '400px',
  };

  return (
    <GroupedBarChart data={data} options={options} />
  );
};

GroupBarChart.propTypes = {
  data: PropTypes.array,
};

GroupBarChart.defaultProps = {
  data: null,
};

export default GroupBarChart;
