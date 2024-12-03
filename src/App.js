import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Home } from './panels/Home';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setFetchedUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await bridge.send('VKWebAppGetUserInfo');
        setFetchedUser(user);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setPopout(null);
      }
    }
    fetchData();
  }, []);

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id={DEFAULT_VIEW_PANELS.HOME} fetchedUser={fetchedUser} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
