import { Button, Cell, Avatar, Div } from '@vkontakte/vkui';
import React from 'react';

export const LeagueCard = ({ title, icon, background, onClick }) => {
  return (
    <Div className="league-card-container">
      <Cell
        className="league-card"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center',
          backgroundSize: 'contain',
        }}
      >
        <div className="league-card-header">
          <Avatar src={icon} size={24} className="league-card-avatar" />
          <span className="league-card-title">{title}</span>
        </div>
        <Button mode="tertiary" size="s" className="league-card-button" onClick={onClick}>
          Перейти
        </Button>
      </Cell>
    </Div>
  );
};
