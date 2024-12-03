import React, { useState } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  Cell,
  Avatar,
  Div,
  Tabbar,
  TabbarItem,
  Button,
  Tabs,
  TabsItem,
  Search,
  Card,
  ModalCard,
  ModalRoot,
  View,
} from '@vkontakte/vkui';
import {
  Icon28HomeOutline,
  Icon28UserCircleOutline,
  Icon28VideoSquareOutline,
  Icon20ChevronRightOutline,
  Icon20ChevronLeftOutline,
  Icon20WriteOutline
} from '@vkontakte/icons';
import russianLeagueIcon from '../assets/rpl.png';
import uefaLeagueIcon from '../assets/uefa.png';
import englishLeagueIcon from '../assets/apl.png';
import { EditFavorites } from './EditFavorites';
import '../Home.css';
import { MainPage } from './MainPage';
import { LeagueDetailRpl } from './LeagueDetailRpl';

export const Home = ({ id, fetchedUser }) => {
  const [favorites_team, setFavorites] = useState(fetchedUser?.favorites || []);
  const [selectedTab, setSelectedTab] = useState('one');
  const [activePanel, setActivePanel] = useState('home');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState('Любая');
  const [selectedTeam, setSelectedTeam] = useState('Любая');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isWatchingOpen, setIsWatchingOpen] = useState(false);
  const [isGoingOpen, setIsGoingOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 3

  const [homePanel, setHomePanel] = useState('main');
  const [broadcastPanel, setBroadcastPanel] = useState('broadcastMain');
  const [profilePanel, setProfilePanel] = useState('profileMain');


  const handleNextPage = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < favorites_team.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const visibleFavorites = favorites_team.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const matches = [
    {
      id: 1,
      team1: 'Крылья Советов',
      team2: 'Динамо',
      score: '0 - 2',
      videoUrl: 'https://www.youtube.com/watch?v=_c9I1iun_c8',
    },
    {
      id: 2,
      team1: 'Спартак',
      team2: 'Зенит',
      score: '4 - 1',
      videoUrl: 'https://www.youtube.com/watch?v=9mycMhWK8Vw',
    },
    {
      id: 3,
      team1: 'Урал',
      team2: 'Ростов',
      score: '1 - 1',
      videoUrl: 'https://www.youtube.com/watch?v=9mycMhWK8Vw',
    },{
      id: 1,
      team1: 'Крылья Советов',
      team2: 'Динамо',
      score: '0 - 2',
      videoUrl: 'https://www.youtube.com/watch?v=_c9I1iun_c8',
    },
    {
      id: 2,
      team1: 'Спартак',
      team2: 'Зенит',
      score: '4 - 1',
      videoUrl: 'https://www.youtube.com/watch?v=9mycMhWK8Vw',
    },
    {
      id: 3,
      team1: 'Урал',
      team2: 'Ростов',
      score: '1 - 1',
      videoUrl: 'https://www.youtube.com/watch?v=9mycMhWK8Vw',
    }
  ];

  const { 
    photo_200 = '', 
    first_name = '', 
    last_name = '', 
    favorites = [], 
    notifications = 1, 
    watching = 2 
  } = fetchedUser || {};
  
  
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  setActiveModal(null);
    setSelectedTab(tab);
    switch (tab) {
      case 'one':
        setActivePanel('home');
        break;
      case 'two':
        setBroadcastPanel('broadcastMain');
        break;
      case 'three':
        setProfilePanel('profileMain');
        break;
      default:
        break;
    }
  };

  const goToEditFavorites = () => {
    setProfilePanel('editFavorites');
  };

  const goToProfile = () => {
    setActivePanel('profileMain');
  };

  const handleFavoritesChange = (updatedFavorites) => {
    console.log("Updated Favorites:", updatedFavorites); // Лог для отладки
    setFavorites(updatedFavorites);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => {
      if (!prev) {
        // Закрываем другие разделы, если "Уведомления" открываются
        setIsWatchingOpen(false);
        setIsGoingOpen(false);
      }
      return !prev;
    });
  };
  
  const toggleWatching = () => {
    setIsWatchingOpen((prev) => {
      if (!prev) {
        // Закрываем другие разделы, если "Буду смотреть" открывается
        setIsNotificationsOpen(false);
        setIsGoingOpen(false);
      }
      return !prev;
    });
  };
  
  const toggleGoing = () => {
    setIsGoingOpen((prev) => {
      if (!prev) {
        // Закрываем другие разделы, если "Пойду" открывается
        setIsNotificationsOpen(false);
        setIsWatchingOpen(false);
      }
      return !prev;
    });
  };
  
  const modal = (
    <ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
      <ModalCard id="chooseLeague" onClose={() => setActiveModal(null)} header="Лиги">
        {['Любая', 'Лига чемпионов УЕФА', 'Английская Премьер-Лига', 'Российская Премьер-Лига'].map((league) => (
          <Div key={league} onClick={() => { setSelectedLeague(league); setActiveModal(null); }}>
            <Button mode="tertiary">{league} {selectedLeague === league ? '✓' : ''}</Button>
          </Div>
        ))}
      </ModalCard>

      <ModalCard id="chooseTeam" onClose={() => setActiveModal(null)} header="Команды">
        {['Любая', 'Зенит', 'Динамо', 'Локомотив', 'ЦСКА', 'Химки', 'Спартак'].map((team) => (
          <Div key={team} onClick={() => { setSelectedTeam(team); setActiveModal(null); }}>
            <Button mode="tertiary">{team} {selectedTeam === team ? '✓' : ''}</Button>
          </Div>
        ))}
      </ModalCard>
    </ModalRoot>
  );

  return (
    <>
          {selectedTab === 'one' && (
            <View activePanel={homePanel}>
              <Panel id="main">
                <MainPage id="main" onLeagueClick={() => setHomePanel('leagueDetailRpl')} />
              </Panel>
              <Panel id="leagueDetailRpl">
                <LeagueDetailRpl id="leagueDetailRpl" onBack={() => setHomePanel('main')} />
              </Panel>
            </View>
          )}


          {selectedTab === 'two' && (
            <View activePanel={broadcastPanel}>
            <Panel id="broadcastMain">
              <PanelHeader>Болельщик</PanelHeader>
            <Group style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <Search placeholder="Поиск" after={null} />

              <Tabs>
                <TabsItem
                  onClick={() => setActiveModal('chooseLeague')}
                  selected={activeModal === 'chooseLeague'}
                >
                  Лиги
                </TabsItem>
                <TabsItem
                  onClick={() => setActiveModal('chooseTeam')}
                  selected={activeModal === 'chooseTeam'}
                >
                  Команды
                </TabsItem>
              </Tabs>

              {/* Контейнер для матчей */}
              <Div style={{ flex: 1, overflowY: 'auto', paddingBottom: '16px' }}>
                {matches.map((match) => (
                  <Card key={match.id} mode="shadow" style={{ margin: '10px 0' }}>
                    <Div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <iframe
                          src={match.videoUrl}
                          width="100%"
                          height="200"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          title={`Match ${match.id}`}
                        ></iframe>
                        <div style={{ marginTop: 12, fontWeight: 'bold', textAlign: 'center' }}>
                          {match.team1} {match.score} {match.team2}
                        </div>
                      </div>
                    </Div>
                  </Card>
                ))}
              </Div>
            </Group>
            </Panel>
            </View>
          )}


          {selectedTab === 'three' && (
            <View activePanel={profilePanel}>
            <Panel id="profileMain">
              <PanelHeader>Болельщик</PanelHeader>
            <Group>
              <Div className="profile-header">
                <Avatar src={photo_200} size={80} />
                <div className="profile-info">
                  <div className="profile-name">{first_name} {last_name}</div>
                </div>
              </Div>

              <Div className="profile-section-title">
                Избранные команды
                <Icon20WriteOutline className="edit-icon" onClick={goToEditFavorites} />
              </Div>
              <Div className="favorites-list-container" style={{ display: 'flex', alignItems: 'center' }}>
        {/* Левая стрелка */}
        <Icon20ChevronLeftOutline
          className="arrow-icon"
          onClick={handlePrevPage}
          style={{
            cursor: currentPage > 0 ? 'pointer' : 'not-allowed',
            opacity: currentPage > 0 ? 1 : 0.5,
          }}
        />
                <div className="favorites-list" style={{ display: 'flex', overflow: 'hidden', margin: '0 10px' }}>
                  {visibleFavorites.map((team) => (
                    <div key={team.id} className="team-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 5px' }}>
                      <Avatar src={team.logo} size={48} />
                      <div className="team-name" style={{ color: 'black' }}>{team.name}</div>
                    </div>
                  ))}
                </div>
                <Icon20ChevronRightOutline
          className="arrow-icon"
          onClick={handleNextPage}
          style={{
            cursor: (currentPage + 1) * ITEMS_PER_PAGE < favorites_team.length ? 'pointer' : 'not-allowed',
            opacity: (currentPage + 1) * ITEMS_PER_PAGE < favorites_team.length ? 1 : 0.5,
          }}
        />
      </Div>

              <Cell
                expandable
                description={`(${notifications})`}
                onClick={toggleNotifications}
                after={<Icon20ChevronRightOutline className="arrow-icon" style={{ transform: isNotificationsOpen ? 'rotate(270deg)' : 'rotate(90deg)' }} />}
              >
                Уведомления
              </Cell>
              {isNotificationsOpen && (
                <Div className="notification-list">
                  {[
                    {
                      id: 1,
                      date: 'Завтра',
                      team1: 'ЦСКА',
                      team2: 'Динамо',
                      score: '4 - 1',
                    },
                  ].map((notification) => (
                    <Card key={notification.id} mode="shadow" style={{ margin: '10px 0' }}>
                      <Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar src={russianLeagueIcon} size={28} style={{ marginRight: 12 }} />
                          <div>
                            <div>{notification.date}</div>
                            <div>
                              {notification.team1} {notification.score} {notification.team2}
                            </div>
                          </div>
                        </div>
                        <Icon20ChevronRightOutline />
                      </Div>
                    </Card>
                  ))}
                </Div>
              )}

              <Cell
                expandable
                description={`(${watching})`}
                onClick={toggleWatching}
                after={<Icon20ChevronRightOutline className="arrow-icon" style={{ transform: isWatchingOpen ? 'rotate(270deg)' : 'rotate(90deg)' }} />}
              >
                Буду смотреть
              </Cell>
              {isWatchingOpen && (
                <Div className="watching-list">
                  {[
                    {
                      id: 1,
                      date: 'Сегодня',
                      time: '17:00',
                      team1: 'ЦСКА',
                      team2: 'Акрон',
                    },
                    {
                      id: 2,
                      date: 'Сегодня',
                      time: '18:30',
                      team1: 'Ростов',
                      team2: 'Локомотив',
                    },
                  ].map((match) => (
                    <Card key={match.id} mode="shadow" style={{ margin: '10px 0' }}>
                      <Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar src={russianLeagueIcon} size={28} style={{ marginRight: 12 }} />
                          <div>
                            <div>{match.date}</div>
                            <div>
                              {match.team1} <b>{match.time}</b> {match.team2}
                            </div>
                          </div>
                        </div>
                        <Icon20ChevronRightOutline />
                      </Div>
                    </Card>
                  ))}
                </Div>
              )}

              <Cell
                expandable
                onClick={toggleGoing}
                after={<Icon20ChevronRightOutline className="arrow-icon" style={{ transform: isGoingOpen ? 'rotate(270deg)' : 'rotate(90deg)' }} />}
              >
                Пойду
              </Cell>
              {isGoingOpen && (
                <Div className="additional-info">Матчи, на которые вы собираетесь пойти.</Div>
              )}
            </Group>
            </Panel>
            <Panel id="editFavorites">
              <EditFavorites
                id="editFavorites"
                favorites={favorites_team}
                onBack={() => setProfilePanel('profileMain')}
                onFavoritesChange={handleFavoritesChange}
              />
            </Panel>
            </View>
          )}

          <div className="footer-tabbar">
            <Tabbar>
              <TabbarItem
                selected={selectedTab === 'one'}
                onClick={() => handleTabChange('one')}
                text="Главная"
                style={{
                  backgroundColor: selectedTab === 'one' ? '--vkui--color_background' : 'transparent',
                  color: selectedTab === 'one' ? '#169F43' : '#888',
                }}
              >
                <Icon28HomeOutline style={{ color: selectedTab === 'one' ? '#169F43' : '#888' }} />
              </TabbarItem>
              <TabbarItem
                selected={selectedTab === 'two'}
                onClick={() => handleTabChange('two')}
                text="Трансляции"
                style={{
                  backgroundColor: selectedTab === 'two' ? '--vkui--color_background' : 'transparent',
                  color: selectedTab === 'two' ? '#169F43' : '#888',
                }}
              >
                <Icon28VideoSquareOutline style={{ color: selectedTab === 'two' ? '#169F43' : '#888' }} />
              </TabbarItem>
              <TabbarItem
                selected={selectedTab === 'three'}
                onClick={() => handleTabChange('three')}
                text="Профиль"
                style={{
                  backgroundColor: selectedTab === 'three' ? '--vkui--color_background' : 'transparent',
                  color: selectedTab === 'three' ? '#169F43' : '#888',
                }}
              >
                <Icon28UserCircleOutline style={{ color: selectedTab === 'three' ? '#169F43' : '#888' }} />
              </TabbarItem>
            </Tabbar>
          </div>
      {modal}
    </>
  );
};

function LeagueCard({ title, icon }) {
  return (
    <Div className="league-card-container">
      <Cell className="league-card">
        <div className="league-card-header">
          <Avatar src={icon} size={24} className="league-card-avatar" />
          <span className="league-card-title">{title}</span>
        </div>
        <Button mode="tertiary" size="s" className="league-card-button">
          Перейти
        </Button>
      </Cell>
    </Div>
  );
}
