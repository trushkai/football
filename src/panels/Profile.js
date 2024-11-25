import React from 'react';
import { Panel, PanelHeader, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { Icon28EditOutline } from '@vkontakte/icons';
import '../Profile.css';

export const Profile = ({ id, fetchedUser }) => {
  const { photo_200, first_name, last_name, favorites = [], notifications, watching } = fetchedUser || {};

  return (
    <Panel id={id}>
      {/* <PanelHeader>Болельщик</PanelHeader>
      <Group>
        <Div className="profile-header">
          <Avatar src={photo_200} size={80} />
          <div className="profile-info">
            <div className="profile-name">{first_name} {last_name}</div>
            <Icon28EditOutline className="profile-edit-icon" />
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
        <Div>Уведомления: {notifications}</Div>
        <Div>Буду смотреть: {watching}</Div>
        <Div>Пойду</Div>
      </Group> */}
    </Panel>
  );
};
