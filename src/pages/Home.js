import React, { useEffect, useState } from 'react'

import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import DraggableLists from '../components/DraggableLists';
import { Paper, Avatar, Group, Text, ScrollArea } from '@mantine/core'


function Home() {

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [data, setData] = useState(null);

  useEffect(async () => {

    if (isAuthenticated) {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const accessToken = await getAccessTokenSilently();
      const res = await axios.get(`${serverUrl}/users/current`, {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      });
      console.log(res.data);

      setData(res.data);
    }

  }, [isAuthenticated])


  return (
    <Paper>

      {(isAuthenticated && data) &&
        <>
          <Group mb={12} ml={24}>
            <Avatar src={user.picture} alt={user.name} size={40} radius='md' />
            <Text weight={400}>Your book lists</Text>
          </Group>
          <DraggableLists userBooks={data.books}> </DraggableLists>
        </>
      }

    </Paper>
  )
}

export default Home
