@echo off
::node app/lib/xone/cli/cli.js %1 %2 %3 %4 %5 %6

if exist app/lib/xone/task/ (
    node app/lib/xone/task/%1.js %2 %3 %4 %5 %6 %7
) else (
    if exist app/node_modules/xone/task/ (
        node app/node_modules/xone/task/%1.js %2 %3 %4 %5 %6 %7
    ) else (
        if exist node_modules/xone/task/ (
            node node_modules/xone/task/%1.js %2 %3 %4 %5 %6 %7
        ) else (
            if exist lib/xone/task/ (
                lib/xone/task/%1.js %2 %3 %4 %5 %6 %7
            ) else (
                if exist xone/task/ (
                    node xone/task/%1.js %2 %3 %4 %5 %6 %7
                ) else (
                    echo Error: Xone library was not found.
                )
            )
        )
    )
)

::node task/xone.js %1 %2 %3 %4 %5 %6
