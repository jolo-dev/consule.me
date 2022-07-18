import { describe, it, expect } from 'vitest';
import { calTimeFromNowOneWeekBeforeAndOneWeekAfter } from '../../composables/utils';

describe('utils', () => {
    it('should return one week before', () => {
        const now = new Date()
        const [oneWeekBefore, oneWeekAfter] = calTimeFromNowOneWeekBeforeAndOneWeekAfter(now)
        
        expect(oneWeekBefore.getTime()).toBeLessThan(now.getTime())
        expect(oneWeekAfter.getTime()).toBeGreaterThan(now.getTime())
        expect(oneWeekBefore.getTime()).toEqual(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        expect(oneWeekAfter.getTime()).toEqual(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    })
})