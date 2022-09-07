import { Skeleton, Typography, Avatar, Divider, Button } from '@douyinfe/semi-ui';
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
  console.log(data);

  let content = (!isLoading && !isError) && (
    <div className='content'>
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
        <Text>Roles: {data.roles}</Text>
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
