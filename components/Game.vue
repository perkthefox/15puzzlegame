<template>
  <div>
    <div class="stats">
      <div class="item">
        <div class="stats__counter">{{ moveCounter }}</div>
      </div>
      <div class="item">
        <div class="stats__timer">{{ time }}</div>
      </div>
    </div>
    <div class="board">
      <transition name="fade">
        <div v-if="!gameStatus" class="message">
          <h2>{{ this.customMessage || 'Чтобы начать, нажмите кнопку "Играть"' }}</h2>
        </div>
      </transition>
      <transition-group tag="div" name="flip-list" class="game">
        <div v-for="(cell, index) in cellSet" :key="cell.val" class="cell">
          <div class="filled" v-if="cell.val > 0" @click="move(cell, index)">{{ cell.val }}</div>
          <div class="empty" ref="emptyCell" v-else></div>
        </div>
      </transition-group>
    </div>

    <button
      class="btn btn-primary btn-play"
      @click="gameStatus ? stop() : play()"
      v-text="gameStatus ? 'Стоп' : 'Играть'"
    ></button>
  </div>
</template>

<script>
import _ from "lodash";
import { recalculateCoords, guessSwitchElement, shuffle } from "@/utils/game";
import { swap } from "@/utils/array";

const makeCellSet = () => {
  const cellSet = Array.from(Array(15).keys(), (v, i) => {
    return {
      x: i % 4,
      y: Math.floor(i / 4),
      val: v + 1
    };
  });
  cellSet.push({
    x: 3,
    y: 3,
    val: 0
  });

  return cellSet;
};

export default {
  data() {
    return {
      cellSet: makeCellSet(),
      moveCounter: 0,
      seconds: 0,

      gameStatus: false,
      wasStopped: false,

      interval: undefined,

      customMessage: undefined
    };
  },

  watch: {
    gameStatus(val) {
      if (!val) {
        clearInterval(this.interval);
        this.moveCounter = 0;
        this.seconds = 0;
        this.cellSet = makeCellSet();
      }
    },

    cellSet(val, oldVal) {
      if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
        const initalSet = makeCellSet();

        if (
          JSON.stringify(initalSet) === JSON.stringify(val) &&
          !this.wasStopped
        ) {
          const time = _.cloneDeep(this.time);
          const moves = _.cloneDeep(this.moveCounter);
          console.log(time, moves);
          this.customMessage = `Вы собрали головоломку за ${time} сделав ${moves} шага! Отлично!`;
          this.gameStatus = false;
        }
      }
    }
  },

  computed: {
    time() {
      return new Date(this.seconds * 1000).toISOString().substr(11, 8);
    }
  },

  mounted() {
    window.forceWin = () => {
      this.cellSet = makeCellSet();
      return "Вы великолепны! (нет)";
    };
  },

  methods: {
    play() {
      this.customMessage = undefined;
      this.wasStopped = false;
      this.gameStatus = true;
      this.interval = setInterval(() => {
        this.seconds++;
      }, 1000);
      this.cellSet = recalculateCoords(shuffle(this.cellSet));
    },

    stop() {
      this.wasStopped = true;
      this.gameStatus = false;
    },

    move(cell, from) {
      const element = guessSwitchElement(this.cellSet, cell);

      if (!element) {
        return;
      }

      this.moveCounter++;
      const to = element.index;

      this.cellSet = recalculateCoords(swap(this.cellSet, from, to));
    }
  }
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.flip-list-move {
  transition: transform 0.5s;
}

.btn-play {
  width: 100%;
  font-size: 1.3rem;
  text-transform: uppercase;
}

.stats {
  margin-bottom: 0.5em;
  display: flex;
  flex-flow: row nowrap;
  line-height: 0;
  font-size: 2rem;

  &__counter {
    width: 80px;
    font-size: 1.75rem;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }

  .item {
    width: 50%;
    flex-basis: 50%;
    padding: 0 0.5em;
    display: flex;
    justify-content: center;
    flex-flow: column nowrap;

    &:last-child {
      padding-right: 0;
      align-items: flex-end !important;
    }

    &:first-child {
      padding-left: 0;
    }
  }
}

.board {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 1em;

  .message {
    border-radius: 10px;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(3px);
    display: flex;
    flex-flow: column wrap;
    padding: 15px;
    justify-content: center;
    align-items: center;

    z-index: 999;

    h2 {
      text-align: center;
    }
  }

  .game {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    height: 100%;
    padding: 0.5em;

    .cell {
      width: 25%;
      padding: 0.125em;

      .empty {
        background: transparent;
        z-index: 1;
      }

      .filled {
        z-index: 10;
      }

      div {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 1.4rem;
        background-color: #7fdbff;
      }
    }
  }
}
</style>
