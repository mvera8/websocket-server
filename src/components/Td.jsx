import { Table, Center } from '@mantine/core';
import PropTypes from 'prop-types';

export const Td = ({ item }) => {
	const emoji = 0 === item ? '❌' : '✅';

	return (
		<Table.Th>
      <Center>
        {emoji}
      </Center>
    </Table.Th>
	)
}

Td.propTypes = {
  item: PropTypes.number,
};