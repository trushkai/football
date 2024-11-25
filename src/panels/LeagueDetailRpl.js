import React, { useState, useEffect } from 'react';
import {Panel,PanelHeader,Group,Div,Avatar,Input,Switch,} from '@vkontakte/vkui';
import {  Icon28ArrowLeftOutline, Icon28Notification, Icon28NotificationDisableOutline, Icon16Minus, Icon16CheckOutline, Icon16Cancel } from '@vkontakte/icons';
import '../LeagueDetailRpl.css'; // Подключение вашего CSS

export const LeagueDetailRpl = ({ id, onBack }) => {
  const [activeTab, setActiveTab] = useState('matches'); // Управление вкладками
  const [showPastMatches, setShowPastMatches] = useState(false);
  const [matches, setMatches] = useState([]);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false); // Перенос состояния из renderContent


  useEffect(() => {
    const now = new Date();
    setMatches([
      {
        id: 1,
        team1: 'Спартак',
        team2: 'Динамо',
        score: '4 - 1',
        time: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        state: 'live',
      },
      {
        id: 2,
        team1: 'Краснодар',
        team2: 'Зенит',
        score: '2 - 3',
        time: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        state: 'past',
      },
      {
        id: 3,
        team1: 'ЦСКА',
        team2: 'Акрон',
        time: new Date(now.getTime() + 3 * 60 * 60 * 1000),
        state: 'today',
      },
      {
        id: 4,
        team1: 'Ростов',
        team2: 'Локомотив',
        time: new Date(now.getTime() + 6 * 60 * 60 * 1000),
        state: 'today',
      },
    ]);
  }, []);

  const renderMatchState = (state) => {
    switch (state) {
      case 'live':
        return <span className="state-dot live">Матч идет</span>;
      case 'today':
        return <span className="state-dot today">Сегодня</span>;
      case 'past':
        return <span className="state-dot past">Прошедший</span>;
      default:
        return null;
    }
  };

  // Отображение содержимого на основе выбранной вкладки
  const renderContent = () => {
    if (activeTab === 'matches') {
      return (
        <>
          {/* Поиск и переключатель */}
          <Div className="search-container">
            <Input
              type="text"
              placeholder="Поиск"
              onChange={(e) => {
                const query = e.target.value.toLowerCase();
                setMatches((prevMatches) =>
                  prevMatches.map((match) => ({
                    ...match,
                    hidden: !(
                      match.team1.toLowerCase().includes(query) ||
                      match.team2.toLowerCase().includes(query)
                    ),
                  }))
                );
              }}
            />
            <div className="switch-container">
              <span>Показывать прошедшие матчи</span>
              <Switch
                checked={showPastMatches}
                onChange={(e) => setShowPastMatches(e.target.checked)}
              />
            </div>
          </Div>
  
          {/* Список матчей */}
          <Group>
            {matches
              .filter((match) => (showPastMatches ? true : match.state !== 'past'))
              .filter((match) => !match.hidden) // Учитываем фильтр поиска
              .map((match) => (
                <Div key={match.id} className="match-card">
                  <div className="match-header">
                    {renderMatchState(match.state)}
                    <button
                      className="notification-button"
                      onClick={() => {
                        setMatches((prev) =>
                          prev.map((m) =>
                            m.id === match.id ? { ...m, notifications: !m.notifications } : m
                          )
                        );
                      }}
                    >
                      {match.notifications ? (
                        <Icon28Notification className="notification-icon active" />
                      ) : (
                        <Icon28NotificationDisableOutline className="notification-icon" />
                      )}
                    </button>
                  </div>
                  <div className="match-body">
                    <div className="team">
                      <Avatar size={24} />
                      <span>{match.team1}</span>
                    </div>
                    <div className="match-info">
                      {match.state === 'today'
                        ? match.time.toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : match.score}
                    </div>
                    <div className="team">
                      <Avatar size={24} />
                      <span>{match.team2}</span>
                    </div>
                  </div>
                </Div>
              ))}
          </Group>
        </>
      );
    } else if (activeTab === 'table') {
      const data = [
        { id: 1, name: 'Локомотив', stats: ['win', 'loss', 'draw', 'win', ''] },
        { id: 2, name: 'ЦСКА', stats: ['loss', 'loss', 'draw', 'loss', 'win'] },
        { id: 3, name: 'Зенит', stats: ['win', 'win', 'win', 'loss', 'draw'] },
        // Добавьте остальные команды
      ];
      return (
        <Group>
          <Div>
          <table className="league-table">
            <thead>
              <tr className="table-up">
                <th style={{ width: '40px' }}></th> {/* Фиксируем ширину для id */}
                <th>Клуб</th> {/* Достаточно места для названия */}
                <th>И</th>
                <th>В</th>
                <th>Н</th>
                <th>П</th>
                <th>ЗМ</th>
                <th>ПМ</th>
                <th>РМ</th>
                <th>Последние 5</th>
              </tr>
            </thead>
            <tbody>
              {data.map((team, index) => (
                <tr key={team.id}>
                  <td>{team.id}</td>
                  <td>{team.name}</td>
                  <td>{index + 10}</td>
                  <td>{index + 5}</td>
                  <td>{index + 3}</td>
                  <td>{index + 2}</td>
                  <td>{index * 2}</td>
                  <td>{index * 3}</td>
                  <td>{index * 1}</td>
                  <td>
                    {team.stats.map((result, idx) => (
                      <span
                        key={idx}
                        className={`result-circle ${
                          result === 'win'
                            ? 'win'
                            : result === 'loss'
                            ? 'loss'
                            : 'draw'
                        }`}
                      >
                        {result === 'win' ? (
                          <Icon16CheckOutline />
                        ) : result === 'loss' ? (
                          <Icon16Cancel />
                        ) : (
                          <Icon16Minus />
                        )}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </Div>
        </Group>
      );
    } else if (activeTab === 'stats') {
      // Данные для отображения статистики
      const statsData = [
        { id: 1, player: 'Илья Иванов', goals: 12 },
        { id: 2, player: 'Петр Смирнов', goals: 10 },
        { id: 3, player: 'Алексей Сидоров', goals: 8 },
        { id: 4, player: 'Николай Кузнецов', goals: 7 },
        { id: 5, player: 'Андрей Воробьев', goals: 5 },
      ];
    
      return (
        <Group>
          <Div>
            <table className="stats-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}></th>
                  <th>Игроки</th>
                  <th>Голы</th>
                </tr>
              </thead>
              <tbody>
                {statsData.map((stat, index) => (
                  <tr key={stat.id}>
                    <td>{index + 1}</td>
                    <td>{stat.player}</td>
                    <td>{stat.goals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Div>
        </Group>
      );
    } else if (activeTab === 'teams') {
    
      // Данные для отображения команд
      const teams = [
        'Динамо', 'Спартак', 'ЦСКА', 'Зенит',
        'Локомотив', 'Химки', 'Краснодар', 'Рубин',
        'Акрон', 'Пари Нижний Новгород', 'Факел', 'Крылья Советов',
        'Ахмат', 'Динамо Махачкала', 'Ростов', 'Оренбург'
      ];
    
      return (
        <>
          {/* Отображение команд */}
          <Group>
            <Div className="team-grid">
              {teams.map((team, index) => (
                <div key={index} className="team-item">
                  <Avatar size={48} />
                  <span>{team}</span>
                </div>
              ))}
              {/* Кнопка для добавления команды */}
              <div
                className="team-item team-add-button"
                onClick={() => setShowAddTeamModal(true)}
              >
                <Avatar size={48} style={{ backgroundColor: '#f4f4f6' }}>
                  <span style={{ fontSize: 24, color: '#7a7a7a' }}>+</span>
                </Avatar>
                <span>Другая</span>
              </div>
            </Div>
          </Group>
    
          {/* Модальное окно для добавления команды */}
          {showAddTeamModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Не нашли команду?</h3>
                <p>Напишите нам, чтобы мы добавили её:</p>
                <Input
                  type="text"
                  placeholder="Название команды"
                  className="team-input"
                />
                <div className="modal-buttons">
                  <button
                    className="modal-submit"
                    onClick={() => setShowAddTeamModal(false)}
                  >
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    };
  };
  

  return (
    <Panel id={id}>
      <PanelHeader before={<Icon28ArrowLeftOutline onClick={onBack} />}>
        Болельщик
      </PanelHeader>

      {/* Вкладки */}
      <Div className="tabs-container">
        <div
          className={`tabs-item ${activeTab === 'matches' ? 'tabs-item--active' : ''}`}
          onClick={() => setActiveTab('matches')}
        >
          Матчи
        </div>
        <div
          className={`tabs-item ${activeTab === 'table' ? 'tabs-item--active' : ''}`}
          onClick={() => setActiveTab('table')}
        >
          Таблица
        </div>
        <div
          className={`tabs-item ${activeTab === 'stats' ? 'tabs-item--active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Статистика
        </div>
        <div
          className={`tabs-item ${activeTab === 'teams' ? 'tabs-item--active' : ''}`}
          onClick={() => setActiveTab('teams')}
        >
          Команды
        </div>
      </Div>        

      {/* Содержимое панели */}
      {renderContent()}
    </Panel>
  );
};
