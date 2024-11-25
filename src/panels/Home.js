import React, { useState } from 'react';
import {
  Panel,
  Tabbar,
  TabbarItem,
  View,
  Group,
  Div,
  Avatar,
} from '@vkontakte/vkui';
import { Icon28HomeOutline, Icon28UserCircleOutline, Icon28VideoSquareOutline } from '@vkontakte/icons';
import '../Home.css';
import { MainPage } from './MainPage';
import { LeagueDetailRpl } from './LeagueDetailRpl';

export const Home = ({ id, fetchedUser }) => {
  const [selectedTab, setSelectedTab] = useState('one');
  const [activePanel, setActivePanel] = useState('main');

  const { photo_200, first_name, last_name, favorites = [], notifications = 0, watching = 0 } = fetchedUser || {};

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === 'one') setActivePanel('main');
  };

  return (
    <Panel id={id}>
      {selectedTab === 'one' && (
        <View activePanel={activePanel}>
          {/* Главная страница */}
          <MainPage id="main" onLeagueClick={() => setActivePanel('leagueDetailRpl')} />

          {/* Детальная страница Лиги */}
          <LeagueDetailRpl
            id="leagueDetailRpl"
            onBack={() => setActivePanel('main')}
          />
        </View>
      )}

      {selectedTab === 'three' && (
        <Group>
          <Div className="profile-header">
            <Avatar src={photo_200} size={80} />
            <div className="profile-info">
              <div className="profile-name">{first_name} {last_name}</div>
            </div>
          </Div>
          <Div className="profile-section-title">Избранные команды</Div>
          <Div className="favorites-list">
            {favorites.map((team) => (
              <div key={team.id} className="team-card">
                <Avatar src={team.logo} size={48} />
                <div className="team-name">{team.name}</div>
              </div>
            ))}
          </Div>
          <Div>Уведомления {notifications}</Div>
          <Div>Буду смотреть {watching}</Div>
        </Group>
      )}

      {/* Нижняя панель для переключения между экранами */}
      <div className="footer-tabbar">
        <Tabbar>
          <TabbarItem
            selected={selectedTab === 'one'}
            onClick={() => handleTabChange('one')}
            text="Главная"
            style={{
              color: selectedTab === 'one' ? '#169F43' : '#888',
            }}
          >
            <Icon28HomeOutline
              style={{
                color: selectedTab === 'one' ? '#169F43' : '#888',
              }}
            />
          </TabbarItem>
          <TabbarItem
            selected={selectedTab === 'two'}
            onClick={() => handleTabChange('two')}
            text="Трансляции"
            style={{
              color: selectedTab === 'two' ? '#169F43' : '#888',
            }}
          >
            <Icon28VideoSquareOutline
              style={{
                color: selectedTab === 'two' ? '#169F43' : '#888',
              }}
            />
          </TabbarItem>
          <TabbarItem
            selected={selectedTab === 'three'}
            onClick={() => handleTabChange('three')}
            text="Профиль"
            style={{
              color: selectedTab === 'three' ? '#169F43' : '#888',
            }}
          >
            <Icon28UserCircleOutline
              style={{
                color: selectedTab === 'three' ? '#169F43' : '#888',
              }}
            />
          </TabbarItem>
        </Tabbar>
      </div>
    </Panel>
  );
};
