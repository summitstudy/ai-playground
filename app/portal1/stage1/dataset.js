function dataset1() {
    const Mineral = (number, surface, shimmer, size, sort, hidden) => ({
        number, surface, shimmer, size, sort, hidden
    });
    const initialMinerals = [
        Mineral(1, "울퉁불퉁하다", "있다", "작다", "diamond", 1),
        Mineral(2, "울퉁불퉁하다", "있다", "작다", "diamond", 3),
        Mineral(3, "울퉁불퉁하다", "없다", "작다", "diamond", 5),
        Mineral(4, "울퉁불퉁하다", "있다", "작다", "diamond", 7),
        Mineral(5, "울퉁불퉁하다", "있다", "작다", "diamond", 9),
        Mineral(6, "울퉁불퉁하다", "없다", "크다", "rock", 2),
        Mineral(7, "매끈하다", "있다", "작다", "rock", 4),
        Mineral(8, "울퉁불퉁하다", "없다", "크다", "rock", 6),
        Mineral(9, "매끈하다", "없다", "크다", "rock", 8),
        Mineral(10, "매끈하다", "있다", "작다", "rock", 10)
    ];
    return initialMinerals;
}
export default dataset1;
