import React, { useState } from 'react';
import { Group, Div, Tabs, TabsItem, Input, Switch, Separator, IconButton } from '@vkontakte/vkui';
import { Icon28Notifications, Icon28NotificationsOff } from '@vkontakte/icons';
import '../Rpl.css';

export const Rpl = () => {
  const [selectedTab, setSelectedTab] = useState('matches');
  const [showPastMatches, setShowPastMatches] = useState(false);
  const [notifications, setNotifications] = useState({});

  const matches = [
    { id: 1, state: 'playing', teams: { home: 'Спартак', away: 'Динамо' }, score: '4 - 1', time: '12:00' },
    { id: 2, state: 'playing', teams: { home: 'Краснодар', away: 'Зенит' }, score: '2 - 3', time: '13:00' },
    { id: 3, state: 'today', teams: { home: 'ЦСКА', away: 'Акрон' }, time: '17:00' },
    { id: 4, state: 'today', teams: { home: 'Ростов', away: 'Локомотив' }, time: '18:30' },
    { id: 5, state: 'past', teams: { home: 'Оренбург', away: 'Пари НН' }, score: '1 - 2' },
  ];

  const filteredMatches = matches.filter((match) => (showPastMatches ? true : match.state !== 'past'));

  const toggleNotification = (id) => {
    setNotifications((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Group>
      <Tabs>
        {['matches', 'table', 'stats', 'teams'].map((tab) => (
          <TabsItem key={tab} selected={selectedTab === tab} onClick={() => setSelectedTab(tab)}>
            {tab === 'matches' && 'Матчи'}
            {tab === 'table' && 'Таблица'}
            {tab === 'stats' && 'Статистика'}
            {tab === 'teams' && 'Команды'}
          </TabsItem>
        ))}
      </Tabs>

      {selectedTab === 'matches' && (
        <Div>
          <Input placeholder="Поиск" />
          <div className="switch-container">
            <span>Показывать прошедшие матчи</span>
            <Switch checked={showPastMatches} onChange={() => setShowPastMatches(!showPastMatches)} />
          </div>
          <Separator />

          {filteredMatches.map((match) => (
            <Div key={match.id} className={`match-card match-${match.state}`}>
              <div className={`match-state-circle ${match.state}`} />
              <div className="match-info">
                <div className="match-teams">
                  {match.teams.home} - {match.teams.away}
                </div>
                <div className="match-score">{match.state === 'today' ? match.time : match.score}</div>
              </div>
              <IconButton onClick={() => toggleNotification(match.id)}>
                {notifications[match.id] ? <Icon28Notifications /> : <Icon28NotificationsOff />}
              </IconButton>
            </Div>
          ))}
        </Div>
      )}
    </Group>
  );
};
