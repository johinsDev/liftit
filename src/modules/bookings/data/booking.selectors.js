import { createSelector } from 'reselect';

export function getMetada(state) {
  return state.bookings.metadata;
}

export const getDistance = createSelector(
  getMetada,
  (metadata) => {
    return ({
      km: metadata.distance && metadata.distance.text,
      mi: metadata.distance && `${  Math.round((metadata.distance.value / 1000) / 1.6 * 100) / 100 } mi`,
      hr: metadata.duration && metadata.duration.text
    })
  }
)