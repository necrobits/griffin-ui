import { IconDelete, IconEdit } from '@douyinfe/semi-icons';
import { Skeleton, Typography, Avatar, Divider, Button, List, CheckboxGroup, Checkbox } from '@douyinfe/semi-ui';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import {useDevLoading} from '~/hooks/devHooks';
import { User } from '~/models';
import { TimeManager } from '~/utils';
import { useFetchUser } from '../../hooks';
import './UserDetails.scss';

const { Title, Text } = Typography;

export default function UserDetails() {
  const {userId} = useParams();
  const { isLoading, isError, data, error } = useFetchUser(userId);
  const devLoading = useDevLoading();
  const [isEditable, setIsEditable] = useState(false);

  const handleEditClicked = () => {
    setIsEditable(prev => !prev);
  }

  let content = (!isLoading && !isError) && (
    <div className='content'>
      <div className='buttons-group-header'>
        <Button className='button' icon={<IconEdit />} type='tertiary' theme='light' onClick={handleEditClicked}>Edit</Button>
        <Button className='button' icon={<IconDelete />} type='danger' theme='light'>Delete</Button>
      </div>
      <Divider margin={'1rem'} />
      <div className='content-header'>
        <div className='ava-group'>
          <Avatar src={data?.avatar}/>
          <Title>{User.getFullName(data)}</Title>
        </div>
        <Text style={{ color: '#aaa'}}>Last online: {TimeManager.formatFromISO(data.lastOnline, 'HH:mm dd.MM.yyyy')}</Text>
      </div>
      <Divider margin={'1rem'} />
      <div className='content-body'>
        <Text>Email: {data.email}</Text>
        <Text>Roles: </Text>
        <CheckboxGroup 
          disabled={!isEditable}
          direction='horizontal'
          defaultValue={data.roles}
        >
          <Checkbox value='Admin'>Admin</Checkbox>
          <Checkbox value='User'>User</Checkbox>
        </CheckboxGroup>
      </div>
      <Divider margin={'1rem'} />
      <div className='buttons-group-footer'>
        <Button className='button' icon={<IconEdit />} type='tertiary' theme='light'>Cancel</Button>
        <Button className='button' icon={<IconDelete />} type='primary' theme='solid'>Save</Button>
      </div>
    </div>  
  )

  const placeholder = (
    <div className='placeholder'>
      <Skeleton.Avatar />
      <Skeleton.Title />
      <Skeleton.Paragraph rows={2}/>
      <Skeleton.Paragraph rows={2}/>
    </div>
  )

  return (
    <Skeleton placeholder={placeholder} loading={devLoading}>
        {content}
    </Skeleton>
  );
}
