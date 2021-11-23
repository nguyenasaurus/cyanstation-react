$(function() {
    // Add event listener
    document.addEventListener("mousemove", mousemove);
    let px1 = $(".px-bg-1");
    let px2 = $(".px-bg-2");
    let halfWidth = window.innerWidth / 2;
    let halfHeight = window.innerHeight / 2;

    function onWindowResize() {
        halfWidth = window.innerWidth / 2;
        halfHeight = window.innerHeight / 2;
    }
    window.addEventListener("resize", onWindowResize);
    let _mouseX = 0;
    let _mouseY = 0;
    // Magic happens here
    function mousemove(e) {
        _mouseX = e.clientX;
        _mouseY = e.clientY;
    }

    function loop() {
        if (_mouseX && _mouseY) {
            let x_norm = _mouseX / halfWidth - 1;
            let y_norm = _mouseY / halfHeight - 1;
            let _depth1 = { x: x_norm * 9, y: y_norm * 9 };
            let _depth2 = { x: x_norm * 2, y: y_norm * 2 };
            gsap.to(px1, { xPercent: _depth1.x, yPercent: _depth1.y, duration: 0.5, ease: 'sine.out' });
            gsap.to(px2, { xPercent: _depth2.x, yPercent: _depth2.y, duration: 0.5, ease: 'sine.out' });
        }
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
});