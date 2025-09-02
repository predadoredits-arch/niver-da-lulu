import React, { useEffect, useState, useRef } from 'react';
import './valentines-day-card.css';
import $ from 'jquery';

const ValentinesDayCard = () => {
  const [typedText, setTypedText] = useState("");
  const intervalRef = useRef(null);

  const fullText = `Amo a sua vida e sou grato por tudo o que você foi pra mim. Você foi o impulso que eu precisava para me redescobrir e enxergar as coisas de uma forma diferente. Apreciei demais o tempo que compartilhamos. Rezo e peço para que Deus cuide de você (e eu sei que Ele vai), porque você é luz, e o Espírito Santo em você me tocou. Desejo, de coração, que sua vida seja repleta de paz e felicidade. Seja quem for que você se torne, onde quer que esteja neste mundo… eu te envio amor. E saiba que sempre haverá um pedaço de você em mim.

Com carinho,
Wil.`;

  useEffect(() => {
    $('.js-open-envelope').on('click', function (event) {
      event.preventDefault();
      var $self = $(this);
      $self.find('.envelope').removeClass('tossing').addClass('open');
      $self.find('.heart use').attr("xlink:href", "#icon-heart-broken");
      $self.find('.envelope__card').removeClass('close').addClass('open');

      // Reset e inicia efeito typing
      setTypedText("");
      let i = 0;

      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(prev => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, 70); // velocidade da digitação
    });

    // Fechar carta quando clicar fora
    $(document).on('click', function (e) {
      if (!$(e.target).closest('.js-open-envelope').length) {
        $('.envelope').removeClass('open').addClass('closing');
        $('.heart use').attr("xlink:href", "#icon-heart");
        $('.envelope__card').removeClass('open').addClass('close');

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTypedText(""); // reseta quando fecha
      }
    });

    return () => {
      $('.js-open-envelope').off('click');
      $(document).off('click');
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="container">
      <a className="envelope-wrapper js-open-envelope" href="#">
        <div className="envelope tossing">
          <div className="envelope__side envelope__side--top"></div>
          <div className="envelope__card">
            <p className="enveloper__card-text">
              {typedText}
              <span className="cursor"></span>
            </p>
          </div>
          <div className="envelope__side envelope__side--right"></div>
          <div className="envelope__side envelope__side--left"></div>
          <div className="envelope__side envelope__side--bottom"></div>
          <svg className="heart">
            <use xlinkHref="#icon-heart"></use>
          </svg>
        </div>
      </a>
    </div>
  );
};

export default ValentinesDayCard;
